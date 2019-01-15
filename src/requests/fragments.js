const projectInfo = `
    fragment projectInfo on Project {
        id
        name
        description
        color
        star
        isStarred
        url
        latestContent {
            url
            selectors
            contents
            contentGroups
            createdAt
        }
        contentGroups
        contentCount
        createdAt
        createdBy {
            id
            username
        }
    }
`;

export default {
    projectInfo
}