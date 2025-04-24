import { createContext, useContext } from "react";

export type PageStepContextType = {
  /**
   * @description: 注册组件
   */
  register: (msg?: string) => () => void;

  /**
   * @description: 报告组件已经完成当前阶段动画
   */
  reportCompletion: () => void;
};

// 全局状态，用来记录各个子组件的动画状态
export const PageStepContext = createContext<PageStepContextType>({
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
