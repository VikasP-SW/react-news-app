import React, { Component } from 'react'

export class NewsItem extends Component {



    render() {
        const categoryColors = {
            general: "bg-warning",
            business: "bg-primary",
            entertainment: "bg-danger",
            health: "bg-success",
            science: "bg-info",
            sports: "bg-danger",
            technology: "bg-dark"
        };
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        const formattedDate = date
            ? new Date(date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            : "";
        return (
            <div className='my-3'>
                <div className="card position-relative">
           {source && (
  <span
    className={`position-absolute badge rounded-pill ${categoryColors[this.props.category]}`}
    style={{
      top: '0',
      right: '10px',
      transform: 'translateY(-50%)',
      zIndex: 2,
      maxWidth: 'calc(100% - 20px)',
      whiteSpace: 'normal',
      overflowWrap: 'anywhere',
      textAlign: 'center'
    }}
  >
    {source}
  </span>
)}

                    <img
                        src={imageUrl || "/no-image.png"}
                        className="card-img-top"
                        alt="News"
                        onError={(e) => {
                            e.target.src = "https://images.americanthinker.com/lm/lmssyegdetysxab3codm_1200.jpg";
                        }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        </h5>
                        <p className="card-text">{description}</p>
                        {(author || date) && (
                            <p className="card-text">
                                <small className="text-muted">
                                    {author && <>By <strong>{author}</strong></>}
                                    {author && date && " | "}
                                    {date && <>Published on {formattedDate}</>}
                                </small>
                            </p>
                        )}
                        <a
                            href={newsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-dark"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
