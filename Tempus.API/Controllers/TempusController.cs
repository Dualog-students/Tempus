using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Cryptography;
using System.Text;
using Tempus.API.Controllers.Dto;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Tempus.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TempusController : ControllerBase
    {
        private MongoClient dbClient;
        private IMongoDatabase database;
        private IMongoCollection<BsonDocument> userCollection;


        public TempusController()
        {
            dbClient = new MongoClient("mongodb://localhost:27017/");
            database = dbClient.GetDatabase("TempusDB");
            userCollection = database.GetCollection<BsonDocument>("Users");
        }


        private static Object MongoObjectToObject(BsonValue bs)
        {
            bs["_id"] = bs["_id"].ToString();
            return BsonTypeMapper.MapToDotNetValue(bs);
        }


        [HttpGet]
        [Route("/users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var query_res = await userCollection.Find(_ => true).ToListAsync();
            var users = query_res.ConvertAll(MongoObjectToObject);
            return Ok(users);
        }


        [HttpGet]
        [Route("/users/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var query_res = await userCollection.Find(filter).FirstOrDefaultAsync();
            if(query_res == null)
            {
                return BadRequest(id + " is not a user.");
            }

            var user = MongoObjectToObject(query_res);
            return Ok(user);
        }


        private static string HashString(string str)
        {
            SHA256 sha256 = SHA256.Create();
            StringBuilder s_builder = new StringBuilder();
            byte[] byte_str = Encoding.UTF8.GetBytes(str);
            byte[] buffer = sha256.ComputeHash(byte_str);
            foreach(var b in buffer)
            {
                s_builder.Append(b.ToString("x2"));
            }

            return s_builder.ToString();
        }


        [HttpPost]
        [Route("/register-user")]
        public async Task<IActionResult> RegisterUser([FromBody]RegisterUserDto new_user)
        {
            if(new_user == null)
            {
                return BadRequest("The body is empty.");
            }

            new_user.Password = HashString(new_user.Password);
            var bson_document = new_user.ToBsonDocument();
            try
            {
                await userCollection.InsertOneAsync(bson_document);
                return Ok("User successfully registered.");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPost]
        [Route("/authenticate-user")]
        public async Task<IActionResult> AuthenticateUser([FromBody]AuthenticateUserDto user)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("Email", user.Email);
            var query_res = await userCollection.Find(filter).FirstOrDefaultAsync();
            if(query_res == null)
            {
                return BadRequest(user.Email + " is not a user.");
            }

            if(HashString(user.Password) == query_res["Password"])
            {
                return Ok("Login successful.");
            }

            return BadRequest("Incorrect password.");
        }
    }
}
