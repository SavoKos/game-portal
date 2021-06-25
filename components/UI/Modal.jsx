import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from './Icon';

import Overlay from './Overlay';

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.active !== this.props.active ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <S.Modal className={this.props.active && 'active' + ' modal'}>
          <Icon
            type="icon-searchclose"
            className="close-modal"
            onClick={this.props.closeModal}
          />
          {this.props.children}
        </S.Modal>
        <Overlay active={this.props.active} onClick={this.props.closeModal} />
      </>
    );
  }
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Modal = styled.div`
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -35%) !important;
  padding: 50px 100px;
  padding-bottom: 0;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: #fff;
  opacity: 0;
  visibility: hidden;
  transition: all ease 0.5s;
  transform: translateY(100vh);
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 40px;

    h1 {
      font-size: 22px;
    }
  }

  .anticon {
    position: absolute;
    top: 10px;
    color: #fff;
    right: 10px;
    font-size: 26px;
    cursor: pointer;
  }

  &.active {
    transform: translateY(0);
    visibility: visible;
    opacity: 1;
    transition: all ease 0.5s;
  }
`;

export default Modal;
