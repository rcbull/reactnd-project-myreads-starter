import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

//search component
class Search extends React.Component {
  state = {
    searchTerms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball',
      'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie',
      'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development',
      'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy',
      'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer',
      'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
      'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting',
      'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River',
      'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale',
      'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'],
    searchedBooks: [],
    message: "No results"
  }

  updateShelf(book, newShelf) {
    if (book) {
      BooksAPI.update(book, newShelf).then(() => {
        book.shelf = newShelf;
        this.setState({ message: "Added book: " + book.title + " to shelf " + newShelf });
      })
    }
  }

  handleSearch = (value) => {
    this.searchBook(value)
  }

  searchBook(criteria) {
    if (criteria.length > 0) {
      BooksAPI.search(criteria, 20).then((searchedBooks) => {
        if (searchedBooks && searchedBooks.length > 0) {
          this.setState({ searchedBooks, message: "The query result is: " + searchedBooks.length })
        } else {
          this.setState({ searchedBooks: [], message: "No results" })
        }
      }).catch(
        (searchedBooks) => {
          this.setState({ searchedBooks, message: "No results" })
        }
      )
    } else {
      this.setState({ searchedBooks: [], message: "No results" })
    }
  }

  render() {
    const {
    } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.handleSearch(event.target.value)} />
          </div>
        </div>
        {this.state.searchedBooks.length > 0 ? (
          <div className="search-books-results">
            <div>{this.state.message}</div>
            <ol className="books-grid">
              {
                this.state.searchedBooks.map((book) => (
                  <li key={book.id} className="contact-list-item">
                    <Book
                      book={book}
                      updateShelf={this.updateShelf.bind(this)}
                    />
                  </li>
                ))}
            </ol>
          </div>
        ) : (
            <div className="search-books-results">
              <div>{this.state.message}</div>
            </div>
          )}
      </div>
    )
  }
}

Search.propTypes = {
  searchBook: PropTypes.func,
  updateShelf: PropTypes.func
}

export default Search