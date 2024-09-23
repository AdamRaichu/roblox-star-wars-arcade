const ContextActionService = game.GetService("ContextActionService");
const RunService = game.GetService("RunService");
const TextChatService = game.GetService("TextChatService");

const fw = script.Parent?.Parent as LocalFlameworkFolder;

function _playerFireInputHandler(actionName: string, inputState: Enum.UserInputState, inputObject: InputObject) {
  fw.events.PlayerFireEvent.FireServer();
  return Enum.ContextActionResult.Pass;
}

function detectFiring() {
  ContextActionService.BindAction(
    "FireWeapon",
    _playerFireInputHandler,
    true,
    Enum.KeyCode.MouseLeftButton,
    Enum.KeyCode.ButtonX,
  );
}

function _waitForChannels() {
  TextChatService.WaitForChild("TextChannels");
  TextChatService.TextChannels.WaitForChild("RBXSystem");
}

function setupSystemChat() {
  if (!RunService.IsClient()) {
    error("Called system chat `setupSystemChat` from the server.", 2);
  }

  const channelsExist = false;

  fw.events.SystemChatEvent.OnClientEvent.Connect((message: string) => {
    if (!channelsExist) {
      _waitForChannels();
    }

    TextChatService.TextChannels.RBXSystem.DisplaySystemMessage(message);
  });
}

export function playerSetup() {
  detectFiring();
  setupSystemChat();
}
