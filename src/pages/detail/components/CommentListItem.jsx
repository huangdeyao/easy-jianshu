import React, { Component } from 'react';
import { 
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  Collapse
} from '@material-ui/core';
import { connect } from 'react-redux';
import { actionCreater } from '../store';
import CommentReply from './CommentReply';
import CommentInfo from './CommentInfo';
import CommentInput from './CommentInput';

class CommentListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentBlockShow: false,
      prefix: '',
      cid: null
    }
  }
  
  render() {
    const { commentBlockShow, prefix, cid } = this.state;
    const { index, commentIndex, comment } = this.props;

    return (
      <div>
        <ListItem>
          <Avatar>
            <i className="iconfont">&#xe6a4;</i>
          </Avatar>
          <ListItemText primary={comment.pseudonym}  />
        </ListItem>
        <div style={{padding: '0 24px', margin: '10px 0'}}>
          {comment.content}
        </div>
        <CommentInfo 
          bordered={false}
          thisId={comment._id}
          onReplyClick={this.handleFReplyClick.bind(this, comment._id)}
          info={{like: comment.like, time: comment.meta.createdAt}} 
        />
        <CommentReply 
          replies={comment.commentReplyList}
          onReplayClick={this.handleReplyClick}
          />
        <Collapse in={commentBlockShow && (index === commentIndex)} timeout="auto" unmountOnExit>
          <CommentInput 
            commentInputCon={commentBlockShow}
            prefix={prefix}
            rtc={true}
            ucid={comment.underCommentID}
            cid={cid}
            onClickCancel={this.handleClickCancel}/>
        </Collapse>
        <Divider/>
      </div>
    );
  }

  handleReplyClick = (prefix = '', cid) => {
    const { index, changeCommentFocusedIndex } = this.props;
    this.setState({
      commentBlockShow: true,
      prefix,
      cid
    })
    changeCommentFocusedIndex(index);
  }

  handleFReplyClick = (cid) => {
    const { index, changeCommentFocusedIndex } = this.props;
    this.setState({
      commentBlockShow: true,
      prefix: '',
      cid
    })
    changeCommentFocusedIndex(index);
  }

  handleClickCancel = () => {
    const { changeCommentFocusedIndex } = this.props;
    changeCommentFocusedIndex(-1);
  }
}

const mapStateToProps = (state) => ({
  commentIndex: state.detail.commentIndex
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeCommentFocusedIndex(index) {
      dispatch(actionCreater.changeInputIndex(index));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem)