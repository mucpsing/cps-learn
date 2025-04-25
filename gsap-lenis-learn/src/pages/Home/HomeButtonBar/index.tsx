/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-04-18 23:43:54
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-04-25 12:06:46
 * @FilePath: \gsap-lenis-learn\src\pages\Home\HomeButtonBar\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function HomeButtonBar() {
  return (
    <div className={["flex justify-start gap-10"].join(" ")}>
      <button
        className={[
          "w-[220px] h-[70px] text-[1.3rem] cursor-pointer",
          "rounded-2xl bg-[#FC1E4F]  text-white",
          "hover:bg-white hover:border-2 hover:border-[#FC1E4F] hover:text-[#FC1E4F]",
          "transition-all duration-300 ease-in-out",
        ].join(" ")}
      >
        <strong>个人简介 📄</strong>
      </button>
      <button
        className={[
          "w-[220px] h-[70px] text-[1.3rem] cursor-pointer",
          "rounded-2xl border-2 border-[#FC1E4F]  text-[#FC1E4F]",
          "hover:border-0 hover:bg-[#FC1E4F] hover:text-[#fff]",
          "transition-all duration-300 ease-in-out",
        ].join(" ")}
      >
        <strong>作品项目 💼</strong>
      </button>
    </div>
  );
}

export default HomeButtonBar;
