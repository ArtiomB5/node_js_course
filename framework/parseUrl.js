module.exports = (baseUrl) => (req, res) => {
    const parseUrl = new URL(req.url, baseUrl);
    console.log(parseUrl);
    return {
        pathname: parseUrl.pathname
    }
}