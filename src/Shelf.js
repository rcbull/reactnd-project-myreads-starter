import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Book from './Book'

//shelf component
class Shelf extends React.Component {
    state = {
    }

    render() {
        console.log(this.props);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    updateShelf={this.props.updateShelf}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}


Shelf.propTypes = {
    books: PropTypes.array,
    updateShelt: PropTypes.func
};

export default Shelf;