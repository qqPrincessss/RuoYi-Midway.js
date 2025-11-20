import * as generatexlsx from "../src/xlsx/generatexlsx";

describe("generateXLSX should generate xlsx file", () => {
  it("should generate xlsx file", async () => {
    const data = [
      ["姓名", "年龄"],
      ["张三", 18]
    ];
    const name = "测试";
    const fileName = await generatexlsx.generateXLSX(data, name);
    expect(fileName).toBe(`${name}.xlsx`);
  });
});
