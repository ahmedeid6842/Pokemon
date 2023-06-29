import { commentsCounter } from '../modules/commentListener';

describe('commentsCounter', () => {
  let sampCommentCount;

  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <span id="comment-count-1"></span>
      </div>
    `;
    sampCommentCount = document.querySelector('#comment-count-1');
  });

  test('updates comment count when there are comments', () => {
    // Arrange
    const comments = [
      {
        id: 1, username: 'user1', comment: 'comment1', creation_date: '2023-06-28',
      },
      {
        id: 2, username: 'user2', comment: 'comment2', creation_date: '2023-06-29',
      },
    ];

    // Act
    commentsCounter('1', comments);

    // Assert
    expect(sampCommentCount.textContent).toBe('2');
  });

  test('updates comment count when there are no comments', () => {
    // Arrange
    const comments = [];

    // Act
    commentsCounter('1', comments);

    // Assert
    expect(sampCommentCount.textContent).toBe('0');
  });
});