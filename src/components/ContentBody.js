function ContentBody({data}) {
  return (
    <div className="body-content">
      <h3>{data?.title || ""}</h3>
      <img
        alt={data.title}
        src={data?.images[0] || data?.category?.image}
        style={{ height: "300px", width: "100%" }}
      />
      <div className="content-discription">{data?.description}</div>
    </div>
  );
}

export default ContentBody;
