const HeaderImage = ({ imageUrl }) => {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage:
          "url(https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202206/MIT_3Q-Computing-Power-01_0.jpg?itok=uQmUuyqI)",
        height: "200px",
        width: "100vw",
        margin: "0",
        padding: "0",
      }}
    ></div>
  );
};

export default HeaderImage;
