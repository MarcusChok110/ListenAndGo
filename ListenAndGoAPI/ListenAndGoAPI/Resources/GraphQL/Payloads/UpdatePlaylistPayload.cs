namespace ListenAndGoAPI.Resources.GraphQL.Payloads
{
    public class UpdatePlaylistPayload
    {
        public bool Success { get; }

        public UpdatePlaylistPayload(bool success)
        {
            Success = success;
        }
    }
}