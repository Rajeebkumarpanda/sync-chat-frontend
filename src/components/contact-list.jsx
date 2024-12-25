import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/Constant";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    selectedChatType,
    setSelectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => handleClick(contact)}
          className={`pl-20 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10  rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={`${HOST}/${contact.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`
                        ${
                          selectedChatData &&
                          selectedChatData._id === contact._id
                            ? "bg-[#ffffff22] border border-white/70"
                            : getColor(contact.color)
                        }
                        uppercase w-10 h-10 8 border-[1px] text-lg flex justify-center items-center rounded-full`}
                  >
                    {contact.firstName
                      ? contact.firstName.split("").shift()
                      : contact.email.split("").shift()}
                  </div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="bg-[#ffff22 h-10 w-10 rounded-full flex justify-center items-center">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{contact.firstName? `${contact.firstName} ${contact.lastName}`:contact.email}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
