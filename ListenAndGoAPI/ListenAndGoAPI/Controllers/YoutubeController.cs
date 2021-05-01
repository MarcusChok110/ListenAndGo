using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ListenAndGoAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace ListenAndGoAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class YoutubeController : ControllerBase
    {
        private readonly YoutubeService _youtubeService;
        
        public YoutubeController(YoutubeService youtubeService)
        {
            _youtubeService = youtubeService;
        }
        
        [HttpGet]
        public async Task<ActionResult> Search([FromQuery] string query)
        {
            var result = await _youtubeService.QueryAsync(query);
            return Content(result.ToString(), "application/json");
        }
    }
}