export default `
query PageQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    schedules {
      day
      description
      intervals {
        begin
        end
        title
        mc {
          name
          image {
            url
          }
        }
        location {
          name
          social {
            googleMaps
          }
          address
          city
        }
        sessions {
          type
          title
          description
          speakers {
            name
            image {
              url
            }
          }
          keywords
          urls {
            drawing
            slides
            web
            video
            demo
          }
          sessions {
            type
            title
            description
            speakers {
              name
              image {
                url
              }
            }
            keywords
            urls {
              drawing
              slides
              web
              video
              demo
            }
          }
        }
        urls {
          video
        }
      }
    }
  }
}
`;
