export default `
query PageQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    allSpeakers {
      name
      talks {
        day
        begin
        end
        title
        type
        description
        urls {
          slides
          web
          video
          demo
        }
      }
      workshops {
        title
        type
        description
      }
      about
      social {
        homepage
        github
        twitter
        linkedin
        twitch
      }
      image {
        url
      }
      country {
        code
      }
    }
  }
}
`;
