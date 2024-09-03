// declare global {
interface RideableModel extends Model {
	VehicleSeat: VehicleSeat;
	Base: BasePart;
	Engine: BasePart;
	CONFIG: VehicleConfigData;
}

interface VehicleConfigData extends Folder {
	ControllingTeam: StringValue;
	CanBeHijacked: BoolValue;
}
// }
