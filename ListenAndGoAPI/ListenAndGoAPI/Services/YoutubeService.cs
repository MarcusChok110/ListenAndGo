using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace ListenAndGoAPI.Services
{
    public class YoutubeService
    {
        private readonly HttpClient _client;
        private readonly IConfiguration _config;

        public YoutubeService(HttpClient client, IConfiguration config)
        {
            _client = client;
            _config = config;
        }

        public async Task<JObject> QueryAsync(string query)
        {
            var builder = new UriBuilder("https://youtube.googleapis.com/youtube/v3/search?");
            var queryParams = HttpUtility.ParseQueryString(builder.Query);

            queryParams["q"] = query;
            queryParams["part"] = "snippet";
            queryParams["maxResults"] = "25";
            queryParams["type"] = "video";
            queryParams["key"] = _config["Google:APIKey"];

            builder.Query = queryParams.ToString();

            var response = await _client.GetAsync(builder.ToString());

            response.EnsureSuccessStatusCode();

            var responseString = await response.Content.ReadAsStringAsync();
            var responseJson = JObject.Parse(responseString);
            return responseJson;
        }
    }
}