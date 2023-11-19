import React,{Component} from 'react'

export class NewsItem extends Component {
  render(){
    let {title, description,imageUrl,newsUrl,author, date, source}= props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <div className='d-flex justify-content-end position-absolute end-0'>
            <span className="badge rounded-pill bg-danger" >
              {source}
            </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small class="text-body-secondary">By {!author?"Unknown":author} at {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Full News</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
