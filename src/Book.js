import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//book component
class Book extends React.Component {
    state = {
        shelf: this.props.book.shelf,
        lastChange: new Date().getTime()
    }

    updateShelf = (event) => {
        this.props.updateShelf(this.props.book, event.target.value);

        this.setState({ shelf: event.target.value, lastChange: new Date().getTime()})
    }

    render() {

        const { title, authors } = this.props.book
        let url = ""
        //checking if book has property imageLinks
        if(this.props.book.hasOwnProperty("imageLinks")){
            url = this.props.book.imageLinks.thumbnail
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url("${url}")` }}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={this.state.shelf}
                            onChange={this.updateShelf}
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" disabled={this.state.shelf === "currentlyReading"}>Currently Reading</option>
                            <option value="wantToRead" disabled={this.state.shelf === "wantToRead"}>Want to Read</option>
                            <option value="read" disabled={this.state.shelf === "read"}>Read</option>
                            <option value="none" disabled={this.state.shelf === "none"}>None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}

Book.propTypes = {
    updateShelt: PropTypes.func
};

export default Book;