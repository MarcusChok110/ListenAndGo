namespace ListenAndGoAPI.Resources.GraphQL.Payloads
{
    public class DeletePlaylistPayload
    {
        public bool Success { get; }

        public DeletePlaylistPayload(bool success)
        {
            Success = success;
        }
    }
}