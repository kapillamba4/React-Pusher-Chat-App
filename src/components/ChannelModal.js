import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react';

const styles = {
  marginTop: 40,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const actionsStyles = {
  textAlign: 'left',
};

const actionBtnStyle = {
  height: 38,
};

class ChannelModal extends Component {
  state = {
    open: false,
    input: '',
  };

  constructor(props) {
    super();
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    e.preventDefault();

    this.setState({
      input: e.target.value,
    });
  }

  open() {
    this.setState({
      open: true,
      input: '',
    });
  }

  close() {
    this.setState({
      open: false,
      input: '',
    });
  }

  render() {
    return (
      <Modal
        trigger={this.props.triggerBtn}
        onOpen={this.open}
        open={this.state.open}
        onClose={this.close}
        style={styles}>
        <Header icon="archive" content={this.props.header} />
        <Modal.Content>
          <p>{this.props.content}</p>
        </Modal.Content>
        <Modal.Actions style={actionsStyles}>
          <Input
            icon="users"
            floated="left"
            inverted={true}
            onChange={this.handleInput}
            iconPosition="left"
            placeholder={this.props.inputFieldTxt}
            value={this.state.input}
          />
          <Button.Group floated="right">
            <Button style={actionBtnStyle} negative inverted size="medium" onClick={this.close}>
              <Icon name="remove" /> {this.props.negativeBtnText}
            </Button>
            <Button
              style={actionBtnStyle}
              positive
              size="medium"
              inverted
              onClick={() => {
                this.props.handleSubmit(this.state.input);
                this.close();
              }}>
              <Icon name="checkmark" /> {this.props.positiveBtnText}
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ChannelModal;
