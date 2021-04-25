namespace ListenAndGoAPI.Resources.GraphQL.Payloads
{
    public class UpdateSongPayload
    {
        public bool Success { get; }

        public UpdateSongPayload(bool success)
        {
            Success = success;
        }
    }
}