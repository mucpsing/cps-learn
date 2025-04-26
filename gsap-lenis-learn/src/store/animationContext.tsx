import { createContext, useContext } from "react";

export type PageStepContextType = {
  animationStep: number;

  /**
   * @description: 注册组件
   */
  register: (msgID: string) => any;

  /**
   * @description: 报告组件已经完成当前阶段动画
   */
  reportCompletion: (msgID: string) => any;
};

// 全局状态，用来记录各个子组件的动画状态
export const PageStepContext = createContext<PageStepContextType>({
  animationStep: -1,
  register: () => () => {},
  reportCompletion: () => {},
});

// 创建自定义Hook（可选但推荐）
export const usePageStep = () => {
  const context = useContext(PageStepContext);
  if (!context) {
    throw new Error("必须在AnimationProvider内使用");
  }
  return context;
};
