function HomeButtonBar() {
  return (
    <div className="flex justify-start gap-10">
      <button className={["w-[220px] h-[70px] text-[1.3rem]", "rounded-2xl bg-[#FC1E4F]  text-white"].join(" ")}>个人简介 📄</button>
      <button className={["w-[220px] h-[70px] text-[1.3rem]", "rounded-2xl border-2 border-[#FC1E4F]  text-[#FC1E4F]"].join(" ")}>作品项目 💼</button>
    </div>
  );
}

export default HomeButtonBar;
