interface ServerStorage extends Instance {
  Vehicles: Folder & {
    MTT: RideableModel;
  };
  Buildings: Folder & {
    "Forward Command Center": DestructibleBuilding;
  };
}

interface Workspace extends DataModel {
  Bases: Folder & {
    Base: BaseModel;
  };
}
