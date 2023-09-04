/*
 * Custom Layout Footer
 * https://github.com/react-component/footer#api
 *
 */

const React = require('react');

exports.wrapPageElement = ({ element, props }) => {
  return React.cloneElement(element, {
    ...props,
    ...element.props,
    footerProps: {
      bottom: `© 2022 by Alipay-Platform Design Department · Terms of Use · Privacy Policy`,
    },
    // showCopyRight: true,
  });
};
