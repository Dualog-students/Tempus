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
                return BadRequest(id + ": is not a valid id.");
            }

            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var query_res = await userCollection.Find(filter).FirstOrDefaultAsync();
            if(query_res == null)
            {
                return BadRequest(id + ": is not a user.");
            }

            var user = MongoObjectToObject(query_res);
            return Ok(user);
        }


        [HttpPost]
        [Route("/register-user")]
        public async Task<IActionResult> CreateUser([FromBody]RegisterUserDto new_user)
        {
            if(new_user == null)
            {
                return BadRequest("The body is empty.");
            }

            SHA256 sha256 = SHA256.Create();
            Console.WriteLine("\n\n");
            Console.WriteLine(new_user.Password);
            byte[] password = Encoding.Unicode.GetBytes(new_user.Password);
            byte[] buffer = sha256.ComputeHash(password);
            Console.WriteLine(buffer);
            new_user.Password = Encoding.Unicode.GetString(buffer, 0, buffer.Length);
            Console.WriteLine(new_user.Password);
            Console.WriteLine("\n\n");

            var bson_document = new_user.ToBsonDocument();
            try
            {
                await userCollection.InsertOneAsync(bson_document);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
