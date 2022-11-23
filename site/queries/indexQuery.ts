export default `
fragment SpeakerFragment on Contact {
  name
  about
  social {
    homepage
    github
    twitter
    linkedin
  }
  image {
    url
  }
}

fragment SponsorFragment on Contact {
  name
  social {
    homepage
  }
  about
  image {
    url
  }
}

query PageQuery($conferenceId: ID!) {
  conference(id: $conferenceId) {
    name
    slogan
    year
    startDate
    endDate
    mcs {
      ...SpeakerFragment
    }
    keynoteSpeakers {
      ...SpeakerFragment
    }
    speakers {
      ...SpeakerFragment
    }
    lightningTalkSpeakers {
      ...SpeakerFragment
    }
    workshopInstructors {
      ...SpeakerFragment
    }
    partners {
      ...SponsorFragment
    }
    goldSponsors {
      ...SponsorFragment
    }
    silverSponsors {
      ...SponsorFragment
    }
    bronzeSponsors {
      ...SponsorFragment
    }
  }
}
`;
