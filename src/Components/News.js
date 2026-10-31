
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  async updateNews(page = this.state.page) {
    const query =
      this.props.category === 'general'
        ? 'india news'
        : `india ${this.props.category}`;

    const apiKey = process.env.REACT_APP_NEWS_API;

    if (!apiKey) {
      console.error(
        'News API key missing. Please check your .env file.'
      );

      this.setState({
        articles: [],
        totalResults: 0,
        loading: false,
      });

      return;
    }

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&sortBy=publishedAt&apiKey=${apiKey}&page=${page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      console.log('Page:', page);
      console.log('Page Size:', this.props.pageSize);
      console.log('News API Response:', parsedData);

      if (!response.ok || parsedData.status !== 'ok') {
        console.error('NewsAPI Error:', parsedData.message);

        this.setState({
          articles: [],
          totalResults: 0,
          loading: false,
        });

        return;
      }

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Fetch Error:', error);

      this.setState({
        articles: [],
        totalResults: 0,
        loading: false,
      });
    }
  }

  componentDidMount() {
    this.updateNews(1);
  }

  handlePrevClick = () => {
    const page = this.state.page - 1;

    if (page >= 1 && !this.state.loading) {
      this.setState({ page }, () => {
        this.updateNews(page);
      });
    }
  };

  handleNextClick = () => {
    const maxPage = Math.min(
      5,
      Math.ceil(this.state.totalResults / this.props.pageSize)
    );

    const page = this.state.page + 1;

    if (page <= maxPage && !this.state.loading) {
      this.setState({ page }, () => {
        this.updateNews(page);
      });
    }
  };

  render() {
    const categoryColors = {
      general: '#3B82F6',
      business: '#F97316',
      entertainment: '#EC4899',
      health: '#22C55E',
      science: '#A855F7',
      sports: '#EF4444',
      technology: '#EAB308',
    };

    const category = this.props.category;

    const maxPage = Math.min(
      5,
      Math.ceil(this.state.totalResults / this.props.pageSize)
    );

    return (
      <div className="container my-3">
        <h1 className="heading">
          <span className="vikas-logo">Vikas </span>
          <span className="news-logo">News</span>
          <span className="hub-logo">Hub</span>
          {' - '}
          <span style={{ color: categoryColors[category] || '#3B82F6' }}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>{' '}
          <span className="news-logo">News</span>
        </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&
            Array.isArray(this.state.articles) &&
            this.state.articles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title || ' '}
                  description={element.description || ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source?.name || 'Unknown'}
                  category={category}
                />
              </div>
            ))}
        </div>

        {!this.state.loading &&
          this.state.articles.length === 0 && (
            <p className="text-center my-4">
              No news articles found. Please try again later.
            </p>
          )}

        <div className="container d-flex justify-content-between my-3">
          <button
            disabled={this.state.page <= 1 || this.state.loading}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>

          <span className="align-self-center">
            Page {this.state.page}
            {maxPage > 0 ? ` of ${maxPage}` : ''}
          </span>

          <button
            disabled={
              this.state.page >= maxPage ||
              this.state.loading ||
              maxPage === 0
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
