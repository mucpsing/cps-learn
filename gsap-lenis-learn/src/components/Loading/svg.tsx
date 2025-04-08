/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-28 09:13:14
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-08 21:12:06
 * @FilePath: \gsap-lenis-learn\src\components\Loading\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function Loading() {
  const LoadingText = () => (
    <svg id="__loading_svg" width="120" height="13" viewBox="0 0 120 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.167614 6.22443V5.26988L5.8267 2.52556V3.82528L1.65057 5.73011L1.68892 5.65341V5.83664L1.65057 5.7642L5.8267 7.66477V8.96875L0.167614 6.22443Z" fill="black" />
      <path
        d="M18.3754 4.11079H17.0458C16.9947 3.8267 16.8995 3.5767 16.7603 3.36079C16.6211 3.14488 16.4506 2.96164 16.2489 2.81108C16.0472 2.66051 15.8214 2.54687 15.5714 2.47017C15.3242 2.39346 15.0614 2.35511 14.783 2.35511C14.2802 2.35511 13.8299 2.48153 13.4322 2.73437C13.0373 2.98721 12.7248 3.35795 12.4947 3.84659C12.2674 4.33522 12.1538 4.93181 12.1538 5.63636C12.1538 6.34659 12.2674 6.94602 12.4947 7.43466C12.7248 7.92329 13.0387 8.29261 13.4364 8.54261C13.8342 8.79261 14.2816 8.91761 14.7788 8.91761C15.0543 8.91761 15.3157 8.88068 15.5629 8.80681C15.8129 8.73011 16.0387 8.61789 16.2404 8.47017C16.4421 8.32244 16.6126 8.14204 16.7518 7.92897C16.8938 7.71306 16.9918 7.46591 17.0458 7.1875L18.3754 7.19176C18.3043 7.62073 18.1665 8.01562 17.962 8.37642C17.7603 8.73437 17.5004 9.04403 17.1822 9.30539C16.8668 9.56392 16.506 9.7642 16.0998 9.90625C15.6935 10.0483 15.2504 10.1193 14.7702 10.1193C14.0146 10.1193 13.3413 9.94034 12.7504 9.58238C12.1594 9.22159 11.6935 8.70596 11.3526 8.03551C11.0146 7.36505 10.8455 6.56534 10.8455 5.63636C10.8455 4.70454 11.016 3.90483 11.3569 3.23721C11.6978 2.56676 12.1637 2.05255 12.7546 1.6946C13.3455 1.3338 14.0174 1.15341 14.7702 1.15341C15.2333 1.15341 15.6651 1.22017 16.0657 1.35369C16.4691 1.48437 16.8313 1.67755 17.1523 1.93323C17.4734 2.18608 17.739 2.49573 17.9492 2.86221C18.1594 3.22585 18.3015 3.64204 18.3754 4.11079Z"
        fill="black"
      />
      <path
        d="M21.7536 10.1449C21.3388 10.1449 20.9638 10.0682 20.6286 9.91477C20.2933 9.75852 20.0277 9.53267 19.8317 9.23721C19.6385 8.94176 19.5419 8.57954 19.5419 8.15056C19.5419 7.78125 19.6129 7.47727 19.755 7.23863C19.897 7 20.0888 6.81108 20.3303 6.67187C20.5717 6.53267 20.8416 6.42755 21.1399 6.35653C21.4382 6.28551 21.7422 6.23153 22.0518 6.1946C22.4439 6.14914 22.7621 6.11221 23.0064 6.0838C23.2507 6.05255 23.4283 6.00284 23.5391 5.93466C23.6499 5.86647 23.7053 5.75568 23.7053 5.60227V5.57244C23.7053 5.20028 23.6001 4.91193 23.3899 4.70738C23.1825 4.50284 22.8729 4.40056 22.4609 4.40056C22.032 4.40056 21.6939 4.49573 21.4467 4.68608C21.2024 4.87358 21.0334 5.08238 20.9396 5.3125L19.7422 5.03977C19.8842 4.64204 20.0916 4.32102 20.3643 4.0767C20.6399 3.82954 20.9567 3.65056 21.3146 3.53977C21.6726 3.42613 22.049 3.36931 22.4439 3.36931C22.7053 3.36931 22.9822 3.40056 23.2749 3.46306C23.5703 3.52272 23.8459 3.63352 24.1016 3.79545C24.3601 3.95738 24.5717 4.18892 24.7365 4.49005C24.9013 4.78835 24.9837 5.17613 24.9837 5.65341V10H23.7393V9.10511H23.6882C23.6058 9.26988 23.4822 9.43181 23.3175 9.59091C23.1527 9.75 22.9411 9.8821 22.6825 9.98721C22.424 10.0923 22.1143 10.1449 21.7536 10.1449ZM22.0305 9.12216C22.3828 9.12216 22.6839 9.05255 22.9339 8.91335C23.1868 8.77414 23.3786 8.59233 23.5092 8.36789C23.6428 8.14062 23.7095 7.89772 23.7095 7.6392V6.79545C23.6641 6.84091 23.576 6.88352 23.4453 6.92329C23.3175 6.96022 23.1712 6.99289 23.0064 7.0213C22.8416 7.04687 22.6811 7.07102 22.5249 7.09375C22.3686 7.11363 22.2379 7.13068 22.1328 7.14488C21.8857 7.17613 21.6598 7.22869 21.4553 7.30255C21.2536 7.37642 21.0916 7.48295 20.9695 7.62216C20.8501 7.75852 20.7905 7.94034 20.7905 8.16761C20.7905 8.48295 20.907 8.72159 21.1399 8.88352C21.3729 9.04261 21.6697 9.12216 22.0305 9.12216Z"
        fill="black"
      />
      <path
        d="M26.6808 12.4545V3.45454H27.9251V4.51562H28.0316C28.1055 4.37926 28.212 4.22159 28.3512 4.04261C28.4904 3.86363 28.6836 3.70738 28.9308 3.57386C29.1779 3.4375 29.5046 3.36931 29.9109 3.36931C30.4393 3.36931 30.9109 3.50284 31.3256 3.76988C31.7404 4.03693 32.0657 4.42187 32.3015 4.92471C32.5401 5.42755 32.6594 6.03267 32.6594 6.74005C32.6594 7.44744 32.5415 8.05397 32.3058 8.55966C32.07 9.0625 31.7461 9.45028 31.3342 9.72301C30.9222 9.99289 30.4521 10.1278 29.9237 10.1278C29.5259 10.1278 29.2006 10.0611 28.9478 9.92755C28.6978 9.79403 28.5018 9.63778 28.3597 9.4588C28.2177 9.27983 28.1083 9.12073 28.0316 8.98153H27.9549V12.4545H26.6808ZM27.9293 6.72727C27.9293 7.1875 27.9961 7.59091 28.1296 7.9375C28.2631 8.28409 28.4563 8.55539 28.7092 8.75142C28.962 8.9446 29.2717 9.04119 29.6381 9.04119C30.0188 9.04119 30.337 8.94034 30.5927 8.73863C30.8484 8.53409 31.0415 8.2571 31.1722 7.90767C31.3058 7.55823 31.3725 7.16477 31.3725 6.72727C31.3725 6.29545 31.3072 5.90767 31.1765 5.56392C31.0487 5.22017 30.8555 4.94886 30.5969 4.75C30.3413 4.55113 30.0217 4.4517 29.6381 4.4517C29.2688 4.4517 28.9563 4.54687 28.7006 4.73721C28.4478 4.92755 28.256 5.19318 28.1254 5.53409C27.9947 5.875 27.9293 6.27272 27.9293 6.72727Z"
        fill="black"
      />
      <path
        d="M38.9918 5.05255L37.837 5.2571C37.7887 5.10937 37.712 4.96875 37.6069 4.83522C37.5046 4.7017 37.3654 4.59233 37.1893 4.5071C37.0131 4.42187 36.793 4.37926 36.5288 4.37926C36.168 4.37926 35.8668 4.46022 35.6254 4.62216C35.3839 4.78125 35.2631 4.98721 35.2631 5.24005C35.2631 5.4588 35.3441 5.63494 35.506 5.76846C35.668 5.90198 35.9293 6.01136 36.2901 6.09659L37.3299 6.33522C37.9322 6.47443 38.381 6.68892 38.6765 6.97869C38.9719 7.26846 39.1197 7.64488 39.1197 8.10795C39.1197 8.5 39.006 8.84943 38.7788 9.15625C38.5543 9.46022 38.2404 9.69886 37.837 9.87216C37.4364 10.0455 36.9719 10.1321 36.4435 10.1321C35.7106 10.1321 35.1126 9.97585 34.6495 9.66335C34.1864 9.34801 33.9023 8.90056 33.7972 8.32102L35.0288 8.13352C35.1055 8.45454 35.2631 8.69744 35.5018 8.86221C35.7404 9.02414 36.0515 9.10511 36.435 9.10511C36.8526 9.10511 37.1864 9.01846 37.4364 8.84517C37.6864 8.66903 37.8114 8.45454 37.8114 8.2017C37.8114 7.99716 37.7347 7.82528 37.5813 7.68608C37.4308 7.54687 37.1992 7.44176 36.8867 7.37074L35.7788 7.12784C35.168 6.98863 34.7163 6.76704 34.4237 6.46306C34.1339 6.15909 33.989 5.77414 33.989 5.30824C33.989 4.92187 34.0969 4.5838 34.3129 4.29403C34.5288 4.00426 34.8271 3.77841 35.2077 3.61647C35.5884 3.4517 36.0245 3.36931 36.516 3.36931C37.2234 3.36931 37.7802 3.52272 38.1864 3.82954C38.5927 4.13352 38.8612 4.54119 38.9918 5.05255Z"
        fill="black"
      />
      <path
        d="M40.5206 10V3.45454H41.7947V10H40.5206ZM41.1641 2.4446C40.9425 2.4446 40.7521 2.37073 40.593 2.22301C40.4368 2.07244 40.3587 1.89346 40.3587 1.68608C40.3587 1.47585 40.4368 1.29687 40.593 1.14914C40.7521 0.998576 40.9425 0.923292 41.1641 0.923292C41.3857 0.923292 41.5746 0.998576 41.7308 1.14914C41.8899 1.29687 41.9695 1.47585 41.9695 1.68608C41.9695 1.89346 41.8899 2.07244 41.7308 2.22301C41.5746 2.37073 41.3857 2.4446 41.1641 2.4446Z"
        fill="black"
      />
      <path
        d="M46.266 10.1321C45.6523 10.1321 45.1168 9.99147 44.6594 9.71022C44.2021 9.42897 43.8469 9.03551 43.5941 8.52983C43.3413 8.02414 43.2148 7.43323 43.2148 6.7571C43.2148 6.07812 43.3413 5.48437 43.5941 4.97585C43.8469 4.46733 44.2021 4.07244 44.6594 3.79119C45.1168 3.50994 45.6523 3.36931 46.266 3.36931C46.8796 3.36931 47.4151 3.50994 47.8725 3.79119C48.3299 4.07244 48.685 4.46733 48.9379 4.97585C49.1907 5.48437 49.3171 6.07812 49.3171 6.7571C49.3171 7.43323 49.1907 8.02414 48.9379 8.52983C48.685 9.03551 48.3299 9.42897 47.8725 9.71022C47.4151 9.99147 46.8796 10.1321 46.266 10.1321ZM46.2702 9.0625C46.668 9.0625 46.9975 8.95738 47.2589 8.74716C47.5202 8.53693 47.7134 8.2571 47.8384 7.90767C47.9663 7.55823 48.0302 7.17329 48.0302 6.75284C48.0302 6.33522 47.9663 5.9517 47.8384 5.60227C47.7134 5.25 47.5202 4.96733 47.2589 4.75426C46.9975 4.54119 46.668 4.43466 46.2702 4.43466C45.8697 4.43466 45.5373 4.54119 45.2731 4.75426C45.0117 4.96733 44.8171 5.25 44.6893 5.60227C44.5643 5.9517 44.5018 6.33522 44.5018 6.75284C44.5018 7.17329 44.5643 7.55823 44.6893 7.90767C44.8171 8.2571 45.0117 8.53693 45.2731 8.74716C45.5373 8.95738 45.8697 9.0625 46.2702 9.0625Z"
        fill="black"
      />
      <path
        d="M52.0135 6.11363V10H50.7393V3.45454H51.9624V4.51988H52.0433C52.1939 4.17329 52.4297 3.89488 52.7507 3.68466C53.0746 3.47443 53.4822 3.36931 53.9737 3.36931C54.4197 3.36931 54.8104 3.46306 55.1456 3.65056C55.4808 3.83522 55.7408 4.11079 55.9254 4.47727C56.1101 4.84375 56.2024 5.29687 56.2024 5.83664V10H54.9283V5.99005C54.9283 5.51562 54.8047 5.14488 54.5575 4.87784C54.3104 4.60795 53.9709 4.47301 53.5391 4.47301C53.2436 4.47301 52.9808 4.53693 52.7507 4.66477C52.5234 4.79261 52.343 4.98011 52.2095 5.22727C52.0788 5.47159 52.0135 5.76704 52.0135 6.11363Z"
        fill="black"
      />
      <path
        d="M59.0064 1.27272V2.09091C59.0064 2.33238 58.9609 2.58664 58.87 2.85369C58.782 3.11789 58.657 3.37216 58.495 3.61647C58.3331 3.86079 58.1428 4.07102 57.924 4.24716L57.2933 3.79545C57.4609 3.55113 57.6058 3.29119 57.728 3.01562C57.853 2.74005 57.9155 2.43608 57.9155 2.10369V1.27272H59.0064Z"
        fill="black"
      />
      <path
        d="M64.3161 5.05255L63.1612 5.2571C63.1129 5.10937 63.0362 4.96875 62.9311 4.83522C62.8288 4.7017 62.6896 4.59233 62.5135 4.5071C62.3374 4.42187 62.1172 4.37926 61.853 4.37926C61.4922 4.37926 61.1911 4.46022 60.9496 4.62216C60.7081 4.78125 60.5874 4.98721 60.5874 5.24005C60.5874 5.4588 60.6683 5.63494 60.8303 5.76846C60.9922 5.90198 61.2536 6.01136 61.6143 6.09659L62.6541 6.33522C63.2564 6.47443 63.7053 6.68892 64.0007 6.97869C64.2962 7.26846 64.4439 7.64488 64.4439 8.10795C64.4439 8.5 64.3303 8.84943 64.103 9.15625C63.8785 9.46022 63.5646 9.69886 63.1612 9.87216C62.7607 10.0455 62.2962 10.1321 61.7678 10.1321C61.0348 10.1321 60.4368 9.97585 59.9737 9.66335C59.5107 9.34801 59.2266 8.90056 59.1214 8.32102L60.353 8.13352C60.4297 8.45454 60.5874 8.69744 60.826 8.86221C61.0646 9.02414 61.3757 9.10511 61.7592 9.10511C62.1768 9.10511 62.5107 9.01846 62.7607 8.84517C63.0107 8.66903 63.1357 8.45454 63.1357 8.2017C63.1357 7.99716 63.0589 7.82528 62.9055 7.68608C62.755 7.54687 62.5234 7.44176 62.2109 7.37074L61.103 7.12784C60.4922 6.98863 60.0405 6.76704 59.7479 6.46306C59.4581 6.15909 59.3132 5.77414 59.3132 5.30824C59.3132 4.92187 59.4212 4.5838 59.6371 4.29403C59.853 4.00426 60.1513 3.77841 60.532 3.61647C60.9126 3.4517 61.3487 3.36931 61.8402 3.36931C62.5476 3.36931 63.1044 3.52272 63.5107 3.82954C63.9169 4.13352 64.1854 4.54119 64.3161 5.05255Z"
        fill="black"
      />
      <path d="M69.1229 10V1.27272H70.4396V5.06534H74.7905V1.27272H76.1115V10H74.7905V6.1946H70.4396V10H69.1229Z" fill="black" />
      <path
        d="M82.0732 7.28551V3.45454H83.3516V10H82.0987V8.86647H82.0305C81.88 9.21591 81.6385 9.5071 81.3061 9.74005C80.9766 9.97017 80.5661 10.0852 80.0746 10.0852C79.6541 10.0852 79.282 9.99289 78.9581 9.80824C78.6371 9.62074 78.3842 9.34375 78.1996 8.97727C78.0178 8.61079 77.9268 8.15767 77.9268 7.61789V3.45454H79.201V7.46449C79.201 7.91051 79.3246 8.26562 79.5717 8.52983C79.8189 8.79403 80.1399 8.92613 80.5348 8.92613C80.7734 8.92613 81.0107 8.86647 81.2464 8.74716C81.4851 8.62784 81.6825 8.44744 81.8388 8.20596C81.9979 7.96448 82.076 7.65767 82.0732 7.28551Z"
        fill="black"
      />
      <path
        d="M85.1658 10V1.27272H86.44V4.51562H86.5167C86.5906 4.37926 86.6971 4.22159 86.8363 4.04261C86.9755 3.86363 87.1687 3.70738 87.4158 3.57386C87.663 3.4375 87.9897 3.36931 88.396 3.36931C88.9244 3.36931 89.396 3.50284 89.8107 3.76988C90.2255 4.03693 90.5508 4.42187 90.7866 4.92471C91.0252 5.42755 91.1445 6.03267 91.1445 6.74005C91.1445 7.44744 91.0266 8.05397 90.7908 8.55966C90.555 9.0625 90.2312 9.45028 89.8192 9.72301C89.4073 9.99289 88.9371 10.1278 88.4087 10.1278C88.011 10.1278 87.6857 10.0611 87.4329 9.92755C87.1829 9.79403 86.9869 9.63778 86.8448 9.4588C86.7028 9.27983 86.5934 9.12073 86.5167 8.98153H86.4102V10H85.1658ZM86.4144 6.72727C86.4144 7.1875 86.4812 7.59091 86.6147 7.9375C86.7482 8.28409 86.9414 8.55539 87.1942 8.75142C87.4471 8.9446 87.7567 9.04119 88.1232 9.04119C88.5039 9.04119 88.8221 8.94034 89.0778 8.73863C89.3335 8.53409 89.5266 8.2571 89.6573 7.90767C89.7908 7.55823 89.8576 7.16477 89.8576 6.72727C89.8576 6.29545 89.7923 5.90767 89.6616 5.56392C89.5337 5.22017 89.3406 4.94886 89.082 4.75C88.8264 4.55113 88.5067 4.4517 88.1232 4.4517C87.7539 4.4517 87.4414 4.54687 87.1857 4.73721C86.9329 4.92755 86.7411 5.19318 86.6104 5.53409C86.4798 5.875 86.4144 6.27272 86.4144 6.72727Z"
        fill="black"
      />
      <path
        d="M96.5906 10.081C96.3576 10.081 96.1573 9.99858 95.9897 9.8338C95.8221 9.66619 95.7383 9.46448 95.7383 9.22869C95.7383 8.99573 95.8221 8.79687 95.9897 8.6321C96.1573 8.46449 96.3576 8.38068 96.5906 8.38068C96.8235 8.38068 97.0238 8.46449 97.1914 8.6321C97.359 8.79687 97.4428 8.99573 97.4428 9.22869C97.4428 9.38494 97.4031 9.52841 97.3235 9.65909C97.2468 9.78693 97.1445 9.8892 97.0167 9.96591C96.8888 10.0426 96.7468 10.081 96.5906 10.081Z"
        fill="black"
      />
      <path
        d="M99.989 10.081C99.756 10.081 99.5558 9.99858 99.3881 9.8338C99.2205 9.66619 99.1367 9.46448 99.1367 9.22869C99.1367 8.99573 99.2205 8.79687 99.3881 8.6321C99.5558 8.46449 99.756 8.38068 99.989 8.38068C100.222 8.38068 100.422 8.46449 100.59 8.6321C100.757 8.79687 100.841 8.99573 100.841 9.22869C100.841 9.38494 100.801 9.52841 100.722 9.65909C100.645 9.78693 100.543 9.8892 100.415 9.96591C100.287 10.0426 100.145 10.081 99.989 10.081Z"
        fill="black"
      />
      <path
        d="M103.387 10.081C103.154 10.081 102.954 9.99858 102.787 9.8338C102.619 9.66619 102.535 9.46448 102.535 9.22869C102.535 8.99573 102.619 8.79687 102.787 8.6321C102.954 8.46449 103.154 8.38068 103.387 8.38068C103.62 8.38068 103.821 8.46449 103.988 8.6321C104.156 8.79687 104.24 8.99573 104.24 9.22869C104.24 9.38494 104.2 9.52841 104.12 9.65909C104.044 9.78693 103.941 9.8892 103.814 9.96591C103.686 10.0426 103.544 10.081 103.387 10.081Z"
        fill="black"
      />
      <g transform="translate(0, 6.5)">
        <path id="__loading_svg_slash" d="M109.27 0.863632L106.458 11.3125H105.32L108.132 0.863632H109.27Z" fill="#FF4848">
          <animate
            attributeName="fill"
            values="#F6B429;#64D487;#1D72B8;#FF7F32;#FF4058"
            keyTimes="0;0.25;0.5;0.75;1"
            dur="5s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1; 0.5 0 0.5 1"
          />
          <animateTransform attributeName="transform" type="scale" values="1 1; 1 -1; 1 1" dur="2s" repeatCount="indefinite" additive="sum" keyTimes="0; 0.5; 1" calcMode="linear" />
          <animateTransform attributeName="transform" type="translate" values="0 -5.5; 0 -5.5; 0 -5.5" dur="2s" repeatCount="indefinite" additive="sum" keyTimes="0; 0.5; 1" calcMode="linear" />
        </path>
      </g>
      <path d="M119.499 7.04261L113.839 9.78693V8.48295L118.016 6.58238L117.973 6.65483V6.47159L118.016 6.54829L113.839 4.64346V3.34375L119.499 6.08806V7.04261Z" fill="black" />
    </svg>
  );
  return (
    <div id="__cps_loading-warp">
      <span id="__cps_loading-char">&lt;</span>
      <span id="__cps_loading-char">&nbsp;</span>
      <span id="__cps_loading-char">C</span>
      <span id="__cps_loading-char">a</span>
      <span id="__cps_loading-char">p</span>
      <span id="__cps_loading-char">s</span>
      <span id="__cps_loading-char">i</span>
      <span id="__cps_loading-char">o</span>
      <span id="__cps_loading-char">n</span>
      <span id="__cps_loading-char">'</span>
      <span id="__cps_loading-char">s</span>
      <span id="__cps_loading-char">&nbsp;</span>
      <span id="__cps_loading-char">H</span>
      <span id="__cps_loading-char">u</span>
      <span id="__cps_loading-char">b</span>
      <span id="__cps_loading-char">&nbsp;</span>
      <span id="__cps_loading-char" className="__cps_loading-colorSlash">
        <strong id="__cps_loading-colorSlash">/</strong>
      </span>
      <span id="__cps_loading-char">&gt;</span>
    </div>
  );
}
