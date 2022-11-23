export default `
query PageQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    organizers {
      name
      image {
        url
      }
      about
      social {
        homepage
      }
    }
  }
}
`;
