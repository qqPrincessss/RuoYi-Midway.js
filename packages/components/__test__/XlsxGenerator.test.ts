import { render } from "vitest-browser-vue";
import XlsxGenerator from "../src/XlsxGenerator/XlsxGenerator.vue";

describe("vue component XlsxGenerator", () => {
  test("should generate xlsx file", async () => {
    const data = [
      ["姓名", "年龄"],
      ["张三", 18]
    ];
    const name = "测试";
    const fileName = await render(XlsxGenerator, {
      props: {
        data,
        name
      }
    });
    expect(fileName).toBe(`${name}.xlsx`);
  });
});
