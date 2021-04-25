namespace ListenAndGoAPI.Resources.GraphQL.Inputs
{
    public record AddPlaylistInput(
        string Name,
        string Description,
        bool IsPublic,
        int UserId
    );
}