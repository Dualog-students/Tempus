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
            var mongoConnectionString = Environment.GetEnvironmentVariable("TempusDBConnectionString");
            var mongoSetting = MongoClientSettings.FromConnectionString(mongoConnectionString);
            dbClient = new MongoClient(mongoSetting);
            database = dbClient.GetDatabase("TempusDB");
            userCollection = database.GetCollection<BsonDocument>("Users");

            var key = Builders<BsonDocument>.IndexKeys.Ascending("Email");
            var option = new CreateIndexOptions{ Unique = true };
            userCollection.Indexes.CreateOne(new CreateIndexModel<BsonDocument>(key, option));
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
            bson_document.Add("Hours", new BsonDocument());
            try
            {
                await userCollection.InsertOneAsync(bson_document);
                return Ok("User successfully registered.");
            }
            catch (MongoDB.Driver.MongoWriteException)
            {
                return BadRequest("A user with this email already exists.");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost]
        [Route("/{id}/delete-user")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var result = await userCollection.DeleteOneAsync(filter);
            if(!result.IsAcknowledged)
            {
                return BadRequest("Something went wrong.");
            }

            if(result.DeletedCount == 0)
            {
                return BadRequest("User was not deleted.");
            }

            return Ok("User deleted successfully");
        }


        [HttpPost]
        [Route("/{id}/update-user-field")]
        public async Task<IActionResult> UpdateUserField(string id, [FromBody]UpdateUserField field)
        {
            if(field == null)
            {
                return BadRequest("The body is empty.");
            }

            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            if(field.Field.ToLower() == "password")
            {
                field.Value = HashString(field.Value);
            }

            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            UpdateDefinition<BsonDocument> update;
            if(Boolean.TryParse(field.Value, out bool bool_val))
            {
                update = Builders<BsonDocument>.Update.Set(field.Field, bool_val);
            }
            else if(Int32.TryParse(field.Value, out int int_val))
            {
                update = Builders<BsonDocument>.Update.Set(field.Field, int_val);
            }
            else if(double.TryParse(field.Value, out double float_val))
            {
                update = Builders<BsonDocument>.Update.Set(field.Field, float_val);
            }
            else
            {
                update = Builders<BsonDocument>.Update.Set(field.Field, field.Value);
            }
            UpdateResult result;
            try
            {
                result = await userCollection.UpdateOneAsync(filter, update);
            }
            catch (MongoDB.Driver.MongoWriteException)
            {
                return BadRequest("A user with this email already exists.");
            }

            if(!result.IsAcknowledged)
            {
                return BadRequest("Something went wrong.");
            }

            if(result.MatchedCount == 0)
            {
                return BadRequest("User not found.");
            }

            if(result.ModifiedCount == 0)
            {
                return BadRequest("Field was not updated.");
            }

            return Ok("Field successfully updated.");
        }


        [HttpPost]
        [Route("/authenticate-user")]
        public async Task<IActionResult> AuthenticateUser([FromBody]AuthenticateUserDto user)
        {
            if(user == null)
            {
                return BadRequest("The body is empty.");
            }

            var filter = Builders<BsonDocument>.Filter.Eq("Email", user.Email);
            var query_res = await userCollection.Find(filter).FirstOrDefaultAsync();
            if(query_res == null)
            {
                return BadRequest(user.Email + " is not a user.");
            }

            if(HashString(user.Password) == query_res["Password"])
            {
                return Ok(query_res["_id"].ToString());
            }

            return BadRequest("Incorrect password.");
        }


        [HttpPost]
        [Route("/{id}/insert-hours")]
        public async Task<IActionResult> InsertHours(string id, [FromBody]HoursDto hours)
        {
            if(hours == null)
            {
                return BadRequest("The body is empty.");
            }

            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            var date = DateTimeOffset.FromUnixTimeMilliseconds(hours.Date).ToString("dd/MM/yyyy");
            var bson_hours = hours.ToBsonDocument();
            bson_hours["Date"] = date;
            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var update = Builders<BsonDocument>.Update.Set("Hours." + date, bson_hours);
            var result = await userCollection.UpdateOneAsync(filter, update);
            if(!result.IsAcknowledged)
            {
                return BadRequest("Something went wrong.");
            }

            if(result.MatchedCount == 0)
            {
                return BadRequest("User not found.");
            }

            if(result.ModifiedCount == 0)
            {
                return BadRequest("Hours have not been logged.");
            }

            return Ok("Hours successfully logged.");
        }


        [HttpPost]
        [Route("/{id}/delete-hours/{_date}")]
        public async Task<IActionResult> DeleteHours(string id, Int64 _date)
        {
            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            var date = DateTimeOffset.FromUnixTimeMilliseconds(_date).ToString("dd/MM/yyyy");
            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var update = Builders<BsonDocument>.Update.Unset("Hours." + date);
            var result = await userCollection.UpdateOneAsync(filter, update);
            if(!result.IsAcknowledged)
            {
                return BadRequest("Something went wrong.");
            }

            if(result.MatchedCount == 0)
            {
                return BadRequest("User not found.");
            }

            if(result.ModifiedCount == 0)
            {
                return BadRequest("Hours was not deleted.");
            }

            return Ok("Hours successfully deleted.");
        }


        [HttpPost]
        [Route("/{id}/add-project")]
        public async Task<IActionResult> AddProject(string id, [FromBody]ProjectDto project)
        {
            if(project == null)
            {
                return BadRequest("The body is empty.");
            }

            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            var bson_project = project.ToBsonDocument();
            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var update = Builders<BsonDocument>.Update.AddToSet("Projects", bson_project);
            var result = await userCollection.UpdateOneAsync(filter, update);
            if(!result.IsAcknowledged)
            {
                return BadRequest("Something went wrong.");
            }

            if(result.MatchedCount == 0)
            {
                return BadRequest("User not found.");
            }

            if(result.ModifiedCount == 0)
            {
                return BadRequest("Project has not been added.");
            }

            return Ok("Project successfully added.");
        }


        [HttpPost]
        [Route("/{id}/delete-project")]
        public async Task<IActionResult> DeleteProject(string id, [FromBody]ProjectDto project)
        {
            if(project == null)
            {
                return BadRequest("The body is empty.");
            }

            ObjectId _id;
            if(!ObjectId.TryParse(id, out _id))
            {
                return BadRequest(id + " is not a valid id.");
            }

            var bson_project = project.ToBsonDocument();
            var filter = Builders<BsonDocument>.Filter.Eq("_id", _id);
            var update = Builders<BsonDocument>.Update.PullFilter("Projects",
                    Builders<BsonDocument>.Filter.Eq("Project", project.Project));
            var result = await userCollection.UpdateOneAsync(filter, update);
            if(!result.IsAcknowledged)
            {
                return BadRequest("Something went wrong.");
            }

            if(result.MatchedCount == 0)
            {
                return BadRequest("User not found.");
            }

            if(result.ModifiedCount == 0)
            {
                return BadRequest("Project has not been deleted.");
            }

            return Ok("Project successfully deleted.");
        }
    }
}
