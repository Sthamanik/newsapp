import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 9,
    category: 'general'
  }; 

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    cateagory: PropTypes.string,
  }; 

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount(){
    this.props.setProgress(10)
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data= await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  handlePrevClick= async ()=>{
    this.props.setProgress(10)
    let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data= await fetch(url);
    let parsedData= await data.json()
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    this.props.setProgress(100)
  }

  handleNextClick= async ()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      this.props.setProgress(10)
      let url= `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true});
      let data= await fetch(url);
      let parsedData= await data.json()
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
      this.props.setProgress(100)
    }
  }


  render(){
    return (
      <>
        <div className="container my-3">
            <h3 className='text-center' style={{margin:"30px 0px"}}>News Library - Top headlines</h3>
            {this.state.loading && <Spinner/>}
            <div className="row">
              {!this.state.loading && this.state.articles.map((element)=> {
                if(element.title !== "[Removed]"){
                  if(element.urlToImage != null){
                return(
                  <div className="col-md-4" key={element.url}>
                      <NewsItem
                      title={element.title?element.title.slice(0, 45):""} 
                      description={element.description?element.description.slice(0, 88): ""}
                      imageUrl={element.urlToImage}
                      newsUrl= {element.url}
                      author= {element.author}
                      date= {element.publishedAt}
                      source= {element.source.name} />
                  </div>
                )
                }}
                return (null);
              })}
            </div>
            <div className="container d-flex justify-content-between">
              <button disabled={this.state.page<=1} type="button" className="btn btn-light" onClick={this.handlePrevClick}>&laquo; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-light" onClick={this.handleNextClick}>Next &raquo;</button>
            </div>
        </div>
      </>
    )
  }
}

export default News
