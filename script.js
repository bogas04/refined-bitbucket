const log = (...args) => console.info("[Refined BitBucket]", ...args);

const KEYS = {
  j: 74,
  k: 75,
};

function createScrollToCommentListener () {
  const state = {
    commentIndex: null
  };

  return e => {
    if (e.shiftKey) {
      const $comments = [...document.querySelectorAll('.comment-thread-container')];

      if (state.commentIndex === null) { // First scroll event
        const [id = null] = location.href.match(/comment-(\d+)$/) || [];
        state.commentIndex = id === null
          ? 0
          : $comments.findIndex(c => c === document.getElementById(id).closest('.comment-thread-container'));
      }

      switch(e.keyCode) {
        case KEYS.j: {
          state.commentIndex = (state.commentIndex + 1) % $comments.length;
          log(`Scrolling to ${state.commentIndex + 1}/${$comments.length} comment`);
          $comments[state.commentIndex].scrollIntoView();
          break;
        }
        case KEYS.k: {
          state.commentIndex = Math.max(0, state.commentIndex - 1);
          log(`Scrolling to ${state.commentIndex + 1}/${$comments.length} comment`);
          $comments[state.commentIndex].scrollIntoView();
          break;
        }
      }
    }
  };
}


window.addEventListener('load', () => {
  log("Initializing");
  document.addEventListener('keyup', createScrollToCommentListener());
});
