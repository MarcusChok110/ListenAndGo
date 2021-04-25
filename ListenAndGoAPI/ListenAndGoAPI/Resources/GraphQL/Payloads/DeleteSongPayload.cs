namespace ListenAndGoAPI.Resources.GraphQL.Payloads
{
    public class DeleteSongPayload
    {
        public bool Success { get; }
        
        public DeleteSongPayload(bool success)
        {
            Success = success;
        }
    }
}