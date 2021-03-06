export default function ThemeLayout({ sidebarColor,activeItem,activeItemText,textColor,mentionBadge}) {
  return (
    <svg
      width={323}
      height={202}
      viewBox="0 0 323 202"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <g clipPath="url(#clip0_1207_117)">
        <path d="M323 0H0V202H323V0Z" fill="#F6F6F6" />
        <rect
          x="27.5"
          y="10.5"
          width={62}
          height={191}
          // fill="#EDEDED"
          fill={sidebarColor}
          stroke={sidebarColor}
        />
        <rect y={10} width={27} height={192} fill={sidebarColor} />
        <path d="M323 10H90V202H323V10Z" fill="white" />
        <path d="M323 10H90V28H323V10Z" fill={sidebarColor} />
        <path
          d="M125 16H99C97.8954 16 97 16.8954 97 18V20C97 21.1046 97.8954 22 99 22H125C126.105 22 127 21.1046 127 20V18C127 16.8954 126.105 16 125 16Z"
          fill={textColor}
        />
        <path
          d="M150.206 145.277H124.252C123.296 145.277 122.522 146.052 122.522 147.008V150.468C122.522 151.424 123.296 152.198 124.252 152.198H150.206C151.162 152.198 151.936 151.424 151.936 150.468V147.008C151.936 146.052 151.162 145.277 150.206 145.277Z"
          fill="#464646"
        />
        <path
          d="M178.756 145.277H157.992C157.037 145.277 156.262 146.052 156.262 147.008V150.468C156.262 151.424 157.037 152.198 157.992 152.198H178.756C179.711 152.198 180.486 151.424 180.486 150.468V147.008C180.486 146.052 179.711 145.277 178.756 145.277Z"
          fill="#676767"
        />
        <path
          d="M141.555 158.255H124.252C123.296 158.255 122.522 159.029 122.522 159.985V161.715C122.522 162.671 123.296 163.445 124.252 163.445H141.555C142.51 163.445 143.285 162.671 143.285 161.715V159.985C143.285 159.029 142.51 158.255 141.555 158.255Z"
          fill="#4A4A4A"
        />
        <path
          d="M185.677 158.255H148.476C147.52 158.255 146.746 159.029 146.746 159.985V161.715C146.746 162.671 147.52 163.445 148.476 163.445H185.677C186.633 163.445 187.407 162.671 187.407 161.715V159.985C187.407 159.029 186.633 158.255 185.677 158.255Z"
          fill="#4A4A4A"
        />
        <path
          d="M236.72 158.255H192.598C191.642 158.255 190.868 159.029 190.868 159.985V161.715C190.868 162.671 191.642 163.445 192.598 163.445H236.72C237.676 163.445 238.45 162.671 238.45 161.715V159.985C238.45 159.029 237.676 158.255 236.72 158.255Z"
          fill="#4A4A4A"
        />
        <rect x="27.5" y={56} width={62} height={8} fill={activeItem} />
        <path
          opacity="0.5"
          d="M97 131.868H314.24"
          stroke="#707070"
          strokeWidth="0.86514"
          strokeLinecap="round"
        />
        <path
          d="M150.206 81.257H124.252C123.296 81.257 122.522 82.0316 122.522 82.9872V86.4478C122.522 87.4034 123.296 88.1781 124.252 88.1781H150.206C151.162 88.1781 151.936 87.4034 151.936 86.4478V82.9872C151.936 82.0316 151.162 81.257 150.206 81.257Z"
          fill="#464646"
        />
        <path
          d="M178.756 81.257H157.992C157.037 81.257 156.262 82.0316 156.262 82.9872V86.4478C156.262 87.4034 157.037 88.1781 157.992 88.1781H178.756C179.711 88.1781 180.486 87.4034 180.486 86.4478V82.9872C180.486 82.0316 179.711 81.257 178.756 81.257Z"
          fill="#676767"
        />
        <path
          d="M190.868 94.2341H124.252C123.296 94.2341 122.522 95.0088 122.522 95.9644V97.6947C122.522 98.6503 123.296 99.425 124.252 99.425H190.868C191.823 99.425 192.598 98.6503 192.598 97.6947V95.9644C192.598 95.0088 191.823 94.2341 190.868 94.2341Z"
          fill="#68ABEE"
        />
        <path
          d="M146.746 106.708H130.308C129.352 106.708 128.578 107.483 128.578 108.439V110.169C128.578 111.124 129.352 111.899 130.308 111.899H146.746C147.701 111.899 148.476 111.124 148.476 110.169V108.439C148.476 107.483 147.701 106.708 146.746 106.708Z"
          fill="#68ABEE"
        />
        <path
          d="M215.957 114.997H130.308C129.352 114.997 128.578 115.772 128.578 116.728V118.458C128.578 119.413 129.352 120.188 130.308 120.188H215.957C216.912 120.188 217.687 119.413 217.687 118.458V116.728C217.687 115.772 216.912 114.997 215.957 114.997Z"
          fill="#4A4A4A"
        />
        <path
          d="M122.954 105.913V120.621"
          stroke="#BFBFBF"
          strokeWidth="0.86514"
          strokeLinecap="round"
        />
        <path
          d="M150.206 38H124.252C123.296 38 122.522 38.7747 122.522 39.7303V43.1908C122.522 44.1464 123.296 44.9211 124.252 44.9211H150.206C151.162 44.9211 151.936 44.1464 151.936 43.1908V39.7303C151.936 38.7747 151.162 38 150.206 38Z"
          fill="#464646"
        />
        <path
          d="M178.756 38H157.992C157.037 38 156.262 38.7747 156.262 39.7303V43.1908C156.262 44.1464 157.037 44.9211 157.992 44.9211H178.756C179.711 44.9211 180.486 44.1464 180.486 43.1908V39.7303C180.486 38.7747 179.711 38 178.756 38Z"
          fill="#676767"
        />
        <path
          d="M202.98 50.9771H124.252C123.296 50.9771 122.522 51.7517 122.522 52.7073V54.4376C122.522 55.3932 123.296 56.1679 124.252 56.1679H202.98C203.935 56.1679 204.71 55.3932 204.71 54.4376V52.7073C204.71 51.7517 203.935 50.9771 202.98 50.9771Z"
          fill="#4A4A4A"
        />
        <path
          d="M145.88 62.2239H124.252C123.296 62.2239 122.522 62.9985 122.522 63.9542V65.6844C122.522 66.64 123.296 67.4147 124.252 67.4147H145.88C146.836 67.4147 147.611 66.64 147.611 65.6844V63.9542C147.611 62.9985 146.836 62.2239 145.88 62.2239Z"
          fill="#4A4A4A"
        />
        <path
          d="M192.598 62.2239H152.802C151.846 62.2239 151.071 62.9985 151.071 63.9542V65.6844C151.071 66.64 151.846 67.4147 152.802 67.4147H192.598C193.554 67.4147 194.328 66.64 194.328 65.6844V63.9542C194.328 62.9985 193.554 62.2239 192.598 62.2239Z"
          fill="#4A4A4A"
        />
        <path
          d="M265.27 50.9771H209.901C208.945 50.9771 208.17 51.7517 208.17 52.7073V54.4376C208.17 55.3932 208.945 56.1679 209.901 56.1679H265.27C266.225 56.1679 267 55.3932 267 54.4376V52.7073C267 51.7517 266.225 50.9771 265.27 50.9771Z"
          fill="#4A4A4A"
        />
        <path
          d="M314 177H100C98.3431 177 97 178.343 97 180V192C97 193.657 98.3431 195 100 195H314C315.657 195 317 193.657 317 192V180C317 178.343 315.657 177 314 177Z"
          fill={sidebarColor}
        />
        <path
          d="M317 7C318.105 7 319 6.10457 319 5C319 3.89543 318.105 3 317 3C315.895 3 315 3.89543 315 5C315 6.10457 315.895 7 317 7Z"
          fill="#C4C4C4"
        />
        <path
          d="M310 7C311.105 7 312 6.10457 312 5C312 3.89543 311.105 3 310 3C308.895 3 308 3.89543 308 5C308 6.10457 308.895 7 310 7Z"
          fill="#C4C4C4"
        />
        <circle cx={106} cy={47} r={9} fill="#D9D9D9" />
        <circle cx={106} cy={90} r={9} fill="#D9D9D9" />
        <circle cx={106} cy={154} r={9} fill="#D9D9D9" />
        <path
          d="M303 7C304.105 7 305 6.10457 305 5C305 3.89543 304.105 3 303 3C301.895 3 301 3.89543 301 5C301 6.10457 301.895 7 303 7Z"
          fill="#C4C4C4"
        />
        <path d="M5 28H22" stroke="#C0C0C0" strokeLinecap="round" />
        <path d="M30 28H88" stroke="#C0C0C0" strokeLinecap="round" />
        <path d="M27 202L27 11" stroke="#C0C0C0" strokeLinecap="round" />
        <path d="M90 202L90 11" stroke="#C0C0C0" strokeLinecap="round" />
        <path
          d="M64 16H32C30.8954 16 30 16.8954 30 18V20C30 21.1046 30.8954 22 32 22H64C65.1046 22 66 21.1046 66 20V18C66 16.8954 65.1046 16 64 16Z"
          fill={textColor}
        />
        <path
          d="M54 35H32C30.8954 35 30 35.8954 30 37C30 38.1046 30.8954 39 32 39H54C55.1046 39 56 38.1046 56 37C56 35.8954 55.1046 35 54 35Z"
          fill={textColor}
        />
        <path
          d="M69 46H41C39.8954 46 39 46.8954 39 48C39 49.1046 39.8954 50 41 50H69C70.1046 50 71 49.1046 71 48C71 46.8954 70.1046 46 69 46Z"
          fill={textColor}
        />
        <path
          d="M66 70H41C39.8954 70 39 70.8954 39 72C39 73.1046 39.8954 74 41 74H66C67.1046 74 68 73.1046 68 72C68 70.8954 67.1046 70 66 70Z"
          fill={textColor}
        />
        <path
          d="M50 58H41C39.8954 58 39 58.8954 39 60C39 61.1046 39.8954 62 41 62H50C51.1046 62 52 61.1046 52 60C52 58.8954 51.1046 58 50 58Z"
          fill={activeItemText}
        />
        <path
          d="M85.7692 70H80.2308C79.551 70 79 70.8954 79 72C79 73.1046 79.551 74 80.2308 74H85.7692C86.449 74 87 73.1046 87 72C87 70.8954 86.449 70 85.7692 70Z"
          fill={mentionBadge}
        />
        <path
          d="M75 58H57C55.8954 58 55 58.8954 55 60C55 61.1046 55.8954 62 57 62H75C76.1046 62 77 61.1046 77 60C77 58.8954 76.1046 58 75 58Z"
          fill={activeItemText}
        />
        <path
          d="M54 83H32C30.8954 83 30 83.8954 30 85C30 86.1046 30.8954 87 32 87H54C55.1046 87 56 86.1046 56 85C56 83.8954 55.1046 83 54 83Z"
          fill={textColor}
        />
        <path
          d="M69 94H41C39.8954 94 39 94.8954 39 96C39 97.1046 39.8954 98 41 98H69C70.1046 98 71 97.1046 71 96C71 94.8954 70.1046 94 69 94Z"
          fill={textColor}
        />
        <path
          d="M66 118H41C39.8954 118 39 118.895 39 120C39 121.105 39.8954 122 41 122H66C67.1046 122 68 121.105 68 120C68 118.895 67.1046 118 66 118Z"
          fill={textColor}
        />
        <path
          d="M50 106H41C39.8954 106 39 106.895 39 108C39 109.105 39.8954 110 41 110H50C51.1046 110 52 109.105 52 108C52 106.895 51.1046 106 50 106Z"
          fill={textColor}
        />
        <path
          d="M75 106H57C55.8954 106 55 106.895 55 108C55 109.105 55.8954 110 57 110H75C76.1046 110 77 109.105 77 108C77 106.895 76.1046 106 75 106Z"
          fill={textColor}
        />
        <mask
          id="mask0_1207_117"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={6}
          y={11}
          width={16}
          height={16}
        >
          <path
            d="M14 27C18.4183 27 22 23.4183 22 19C22 14.5817 18.4183 11 14 11C9.58172 11 6 14.5817 6 19C6 23.4183 9.58172 27 14 27Z"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask0_1207_117)">
          <circle cx={14} cy={19} r={8} fill="#D9D9D9" />
        </g>
        <mask
          id="mask1_1207_117"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={6}
          y={31}
          width={16}
          height={16}
        >
          <path
            d="M14 47C18.4183 47 22 43.4183 22 39C22 34.5817 18.4183 31 14 31C9.58172 31 6 34.5817 6 39C6 43.4183 9.58172 47 14 47Z"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask1_1207_117)">
          <circle cx={14} cy={39} r={8} fill="#D9D9D9" />
        </g>
        <mask
          id="mask2_1207_117"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={6}
          y={51}
          width={16}
          height={16}
        >
          <path
            d="M14 67C18.4183 67 22 63.4183 22 59C22 54.5817 18.4183 51 14 51C9.58172 51 6 54.5817 6 59C6 63.4183 9.58172 67 14 67Z"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask2_1207_117)">
          <circle cx={14} cy={59} r={8} fill="#D9D9D9" />
        </g>
        <mask
          id="mask3_1207_117"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={6}
          y={71}
          width={16}
          height={16}
        >
          <path
            d="M14 87C18.4183 87 22 83.4183 22 79C22 74.5817 18.4183 71 14 71C9.58172 71 6 74.5817 6 79C6 83.4183 9.58172 87 14 87Z"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask3_1207_117)">
          <circle cx={14} cy={79} r={8} fill="#D9D9D9" />
        </g>
        <mask
          id="mask4_1207_117"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x={6}
          y={91}
          width={16}
          height={16}
        >
          <path
            d="M14 107C18.4183 107 22 103.418 22 99C22 94.5817 18.4183 91 14 91C9.58172 91 6 94.5817 6 99C6 103.418 9.58172 107 14 107Z"
            fill="#C4C4C4"
          />
        </mask>
        <g mask="url(#mask4_1207_117)">
          <circle cx={14} cy={99} r={8} fill="#D9D9D9" />
        </g>
      </g>
      <rect x="0.5" y="0.5" width={322} height={201} rx="3.5" stroke="black" />
      <path
        d="M19 35.625C20.1736 35.625 21.125 34.6736 21.125 33.5C21.125 32.3264 20.1736 31.375 19 31.375C17.8264 31.375 16.875 32.3264 16.875 33.5C16.875 34.6736 17.8264 35.625 19 35.625Z"
        fill="#EF3B3B"
        stroke="#EDEDED"
        strokeWidth="0.25"
      />
      <defs>
        <clipPath id="clip0_1207_117">
          <rect width={323} height={202} rx={4} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
