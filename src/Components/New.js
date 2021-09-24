import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class New extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            loading: true,
            page: 1

        }
        document.title= `${this.props.category} - News App`
    }

    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3292f9c4b5ac4ff28fa8f6fbcb2686ed&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3292f9c4b5ac4ff28fa8f6fbcb2686ed&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false })
        this.updateNews()
    }

    handleNext = async () => {
        console.log("Next");
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3292f9c4b5ac4ff28fa8f6fbcb2686ed&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true })
        //     let data = await fetch(url)
        //     let parseData = await data.json()
        //     console.log(parseData);
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parseData.articles,
        //         loading: false
        //     })
        // }
        
        this.setState({page: this.state.page + 1})
        this.updateNews()
    }
    handlePre = async () => {
        // console.log("Pre");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3292f9c4b5ac4ff28fa8f6fbcb2686ed&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parseData = await data.json()
        // console.log(parseData);
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parseData.articles,
        //     loading: false
        // })
        this.setState({page: this.state.page - 1})
        this.updateNews()
    }

    render() {
        return (
            <div className="container my-3">
                <h2>News App  - Top {this.props.category} Headlines </h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map(element => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}
                                author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">

                    <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" onClick={this.handlePre}>&larr; Pre</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default New


