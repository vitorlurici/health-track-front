import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M27.6 3.28H35.36V36.72H27.6V3.28ZM4.64 3.28H12.4V36.72H4.64V3.28Z"
        fill="#668284"
      />
      <path
        d="M35.36 21.6H4.64V23.92H35.36V21.6Z"
        fill="url(#paint0_linear_258_768)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.64 16.08H35.36V18.3996H4.64V16.08ZM15.76 23.92H24.24V36.72H15.76V23.92ZM15.68 3.28H24.32V16.08H15.68V3.28Z"
        fill="url(#paint1_linear_258_768)"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M29.9195 16.08H33.1205V23.92H29.9195V16.08ZM6.95952 16.08H10.1605V23.92H6.95952V16.08ZM35.36 18.3995V21.6005H4.64V18.3995H35.36Z"
        fill="#668284"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.4 36.72V21.6H21.6V36.72H18.4Z"
        fill="#668284"
      />
      <defs>
        <linearGradient
          id="paint0_linear_258_768"
          x1="20"
          y1="3.28"
          x2="20"
          y2="36.72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B63838" />
          <stop offset="1" stop-color="#C83434" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_258_768"
          x1="20"
          y1="3.28"
          x2="20"
          y2="36.72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B63838" />
          <stop offset="1" stop-color="#C83434" />
        </linearGradient>
      </defs>
    </svg>
  `,
  styles: [],
})
export class LogoComponent {}
