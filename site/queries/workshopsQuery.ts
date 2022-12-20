export default `
query PageQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    workshops {
      day
      begin
      end
      speakers {
        name
        image {
          url
        }
      }
      title
      description
      location {
        name
        address
        city
      }
    }
  }
}
`;
