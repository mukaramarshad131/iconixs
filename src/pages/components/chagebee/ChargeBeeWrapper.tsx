// import {
//   CardComponent,
//   CardNumber,
//   CardExpiry,
//   CardCVV,
// } from '@chargebee/chargebee-js-react-wrapper';
// import React from 'react';

// class ChargeBeeWrapper extends React.Component {
//   constructor(props) {
//     super(props);
//     this.myRef = React.createRef();
//   }

//   state = {
//     errors: {},
//     errorMessage: '',
//     // CSS class names for field's status
//     classes: {
//       focus: 'focus-css-class',
//       complete: 'complete-css-class',
//       invalid: 'invalid-css-class',
//       empty: 'empty-css-class',
//     },
//     // Google Fonts and other whitelisted fonts
//     fonts: ['https://fonts.googleapis.com/css?family=Open+Sans'],
//     // Style customizations
//     styles: {
//       base: {
//         color: '#fff',
//         fontWeight: 600,
//         fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
//         fontSize: '16px',
//         fontSmoothing: 'antialiased',

//         ':focus': {
//           color: '#424770',
//         },

//         '::placeholder': {
//           color: '#9BACC8',
//         },

//         ':focus::placeholder': {
//           color: '#CFD7DF',
//         },
//       },
//       invalid: {
//         color: '#fff',
//         ':focus': {
//           color: '#FA755A',
//         },
//         '::placeholder': {
//           color: '#FFCCA5',
//         },
//       },
//     },
//   };

//   onSubmit = (e) => {
//     if (e) e.preventDefault();
//     if (this.cardRef) {
//       // Call tokenize method on card element
//       this.cardRef.current.tokenize().then((data) => {
//         console.log('chargebee token', data.token);
//       });
//     }
//   };

//   onChange = (status) => {
//     const errors = {
//       ...this.state.errors,
//       [status.field]: status.error,
//     };
//     const errMessages = Object.values(errors).filter((message) => !!message);
//     this.setState({
//       errors,
//       errorMessage: errMessages.pop() || '',
//     });
//   };

//   onReady = (el) => {
//     el.focus();
//   };

//   render() {
//     const { fonts, styles, classes, locale } = this.state;
//     // Using individual fields mode
//     return (
//       <div className="App">
//         <div className="cell example example3" id="example-3">
//           <form>
//             <div className="fieldset">
//               <CardComponent
//                 className="field"
//                 fonts={fonts}
//                 classes={classes}
//                 locale={locale}
//                 styles={styles}
//                 ref={this.myRef}
//                 showTestCards
//                 onReady={this.onReady}
//               >
//                 <CardNumber
//                   placeholder="4111 1111 1111 1111"
//                   className="field empty"
//                   onChange={this.onChange}
//                   onReady={this.onReady}
//                 />
//                 <CardExpiry
//                   placeholder="MM / YY"
//                   className="field empty"
//                   onChange={this.onChange}
//                 />
//                 <CardCVV placeholder="CVV" className="field empty" onChange={this.onChange} />
//               </CardComponent>
//             </div>
//             <button type="submit" onClick={this.onSubmit}>
//               Pay now
//             </button>
//           </form>
//           <div id="errors">{this.state.errorMessage}</div>
//         </div>
//       </div>
//     );
//   }
// }
// export default ChargeBeeWrapper;
