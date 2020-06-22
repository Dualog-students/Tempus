using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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


        [HttpGet]
        [Route("/users")]
        public async Task<IActionResult> GetAllUsers()
        {
            return Ok();
        }


        [HttpGet]
        [Route("/users/{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            return Ok();
        }
    }
}
