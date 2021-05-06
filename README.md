# Listen And Go

"Listen And Go" is an Angular and ASP.NET Core project for users who want to listen to YouTube playlists on the go, without needing a YouTube account. The user, song, and playlist data is saved to a PostgreSQL database using both GraphQL and HTTP API routes.

## Pages

### Home

![](https://i.imgur.com/M73fWu5.png)

### Search

![](https://i.imgur.com/Os54eON.png)

### Playlists

![](https://i.imgur.com/QDH7fYR.png)

![](https://i.imgur.com/hGVucIS.png)

## Frontend Dependencies

```json
    "@angular/animations": "~11.2.6",
    "@angular/cdk": "^11.2.10",
    "@angular/common": "~11.2.6",
    "@angular/compiler": "~11.2.6",
    "@angular/core": "~11.2.6",
    "@angular/forms": "~11.2.6",
    "@angular/material": "^11.2.10",
    "@angular/platform-browser": "~11.2.6",
    "@angular/platform-browser-dynamic": "~11.2.6",
    "@angular/router": "~11.2.6",
    "@angular/youtube-player": "^11.2.11",
    "@apollo/client": "^3.3.15",
    "apollo-angular": "^2.4.0",
    "graphql": "^15.5.0",
    "rxjs": "~6.6.0",
    "tslib": "^2.0.0",
    "zone.js": "~0.11.3"
```

## Database Models

### Song

```c#
    public class Song
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Artist { get; set; }

        [Required]
        [Column(TypeName = "varchar(7)")]
        public SongType Type { get; set; }

        [Required]
        public string Path { get; set; }

        public ICollection<Playlist> Playlists { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public string ImgUrl { get; set; }

        public enum SongType
        {
            Youtube,
            Spotify,
            Local,
            Soundcloud
        };
    }
```

### Playlist

```c#
    public class Playlist
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; }

        [Required]
        public bool IsPublic { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Song> Songs { get; set; }
    }
```

## GraphQL Endpoints (/graphql)

### Queries

- `songs` — queries the Song table in the database
- `playlist` — queries the Playlist table in the database

### Mutations

- Songs: `addSong`, `updateSong`, `deleteSong`
- Playlists: `addPlaylist`, `updatePlaylist`, `deletePlaylist`, `addSongToPlaylist`, `removeSongFromPlaylist`

See built-in documentation at endpoint for details about inputs and payloads returned.

## HTTP Endpoints (/api)

- `POST /Auth/SignUp/` — registers a new user in the database
- `POST /Auth/SignIn/` — returns a new JWT to authenticate a user
- `GET /Auth/Ping/` — returns user information for signed in users
- `GET /Youtube?query=<QUERY>` — returns video search results from YouTube

## Backend Dependencies (ASP.NET Core)

```xml
        <PackageReference Include="AutoMapper" Version="10.1.1" />
        <PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="8.1.1" />
        <PackageReference Include="HotChocolate.AspNetCore" Version="11.2.1" />
        <PackageReference Include="HotChocolate.AspNetCore.Authorization" Version="11.2.2" />
        <PackageReference Include="HotChocolate.Data" Version="11.2.1" />
        <PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="5.0.5" />
        <PackageReference Include="Microsoft.AspNetCore.Identity" Version="2.2.0" />
        <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="5.0.5" />
        <PackageReference Include="Microsoft.EntityFrameworkCore" Version="5.0.5" />
        <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="5.0.5">
          <PrivateAssets>all</PrivateAssets>
          <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
        </PackageReference>
        <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="5.0.5">
          <PrivateAssets>all</PrivateAssets>
          <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
        </PackageReference>
        <PackageReference Include="Microsoft.Extensions.Identity.Stores" Version="5.0.5" />
        <PackageReference Include="Microsoft.VisualStudio.Web.CodeGeneration.Design" Version="5.0.2" />
        <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="5.0.5" />
        <PackageReference Include="Swashbuckle.AspNetCore" Version="5.6.3" />
        <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="6.10.2" />
```

## Local Installation

Currently, the application is not deployed or hosted on the web because Google (and other companies) have not verified the app for production. To use it, you must install it locally. You must install Node and .NET, and then follow these steps:

1. Download / clone the repository.
2. `npm install` the frontend dependencies and install the NuGet packages for the backend
3. Obtain an API key from Google to use the Youtube Data API
4. Create a PostgreSQL database and set up user secrets on the backend with the following values:

```json
  "Google": {
    "APIKey": <YOUR_GOOGLE_API_KEY>
  },
  "ConnectionStrings": {
    "DefaultConnection": <YOUR_POSTGRES_CONNECTION_STRING>
  },
  "Jwt": {
    "Issuer": "http://localhost:5000",
    "Secret": <YOUR_CUSTOM_JWT_SECRET_KEY>,
    "ExpirationInDays": 30
  }
```

5. Run both the frontend and backend. If all goes well, you should see the frontend being run at http://localhost:4200 and the backend run at https://localhost:5001.
6. Listen to some songs!

## Todo

- Add Spotify / Soundcloud integration for playlists and songs
- Add Explore page where users can search up other existing songs and playlists
- Add ability to loop and shuffle playlists
- Add ability to change the volume of the song in app
