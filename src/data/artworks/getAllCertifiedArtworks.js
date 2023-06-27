import getAllArtworks from "./getAllArtworks";

const getAllCertifiedArtworks = async () => {
  let artworks = await getAllArtworks();

  return artworks.filter((art) => art.isAuthenticated === true);
};

export default getAllCertifiedArtworks;
