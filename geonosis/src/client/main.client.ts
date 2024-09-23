import { RadialMenu } from "@rbxts/rbx-gui-library";
import { client } from "@rbxts/adamraichu__local_rbx-swa-common";

const Players = game.GetService("Players");
const gui = Players.LocalPlayer.WaitForChild("PlayerGui");

client.playerSetup();

const buildMenu = new Instance("ScreenGui");
buildMenu.Name = "BuildMenu";
buildMenu.Parent = gui;

const menu = new RadialMenu(8, 0.5, math.pi);
menu.DeadZoneIn = 0.1;
menu.DeadZoneOut = 1;
menu.Frame.Position = UDim2.fromScale(0.5, 0.5);
menu.Frame.AnchorPoint = new Vector2(0.5, 0.5);
menu.Frame.Size = UDim2.fromScale(0.5, 0.5);
// menu.Frame.Parent = buildMenu; // FIXME:

menu.Hover.Connect((oldIndex: number, newIndex: number) => {
  print(`from ${oldIndex} to ${newIndex}`);
});
menu.Clicked.Connect((index: number) => {
  const bg = menu.GetAttachment(index);
  const text = new Instance("TextLabel");
  text.Text = "Clicked!";
  text.Position = UDim2.fromScale(0.5, 0.5);
  text.Parent = bg;
});
