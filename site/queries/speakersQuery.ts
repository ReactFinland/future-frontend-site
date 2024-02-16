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
          drawing
          slides
          web
          video
          demo
        }
      }
      workshops {
        day
        begin
        end
        title
        type
        description
      }
      tagline
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
