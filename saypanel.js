const { 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    EmbedBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle 
} = require('discord.js');

const SAYPANEL_CHANNEL_ID = "1307761271705440328"; // Replace with your panel channel ID

module.exports = {
    name: "saypanel",
    async execute(client) {
        const panelChannel = client.channels.cache.get(SAYPANEL_CHANNEL_ID);
        if (!panelChannel) {
            console.log("❌ SayPanel channel not found!");
            return;
        }

        // Create the embed panel
        const embed = new EmbedBuilder()
            .setTitle("📢 Announcement Panel")
            .setDescription("Click the button below to create an announcement.")
            .setColor("#007bff") // Blue theme
            .setFooter({ text: "Use this panel to send announcements across the server!" });

        // Create the button
        const button = new ButtonBuilder()
            .setCustomId("create_announcement")
            .setLabel("📢 Create Announcement")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder().addComponents(button);

        // Send the panel message
        await panelChannel.send({ embeds: [embed], components: [row] });
    },
};

// Handle button interaction
module.exports.buttonHandler = async (interaction) => {
    if (interaction.customId === "create_announcement") {
        const modal = new ModalBuilder()
            .setCustomId("announcement_modal")
            .setTitle("Create Announcement");

        const nameInput = new TextInputBuilder()
            .setCustomId("announcement_name")
            .setLabel("Announcement Title")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const messageInput = new TextInputBuilder()
            .setCustomId("announcement_message")
            .setLabel("Message Content")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const imageInput = new TextInputBuilder()
            .setCustomId("announcement_image")
            .setLabel("Image URL (Optional)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const mentionRoleInput = new TextInputBuilder()
            .setCustomId("mention_role")
            .setLabel("Mention Role ID (Optional)")
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        const channelInput = new TextInputBuilder()
            .setCustomId("announcement_channel")
            .setLabel("Channel ID to send (Required)")
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        const row1 = new ActionRowBuilder().addComponents(nameInput);
        const row2 = new ActionRowBuilder().addComponents(messageInput);
        const row3 = new ActionRowBuilder().addComponents(imageInput);
        const row4 = new ActionRowBuilder().addComponents(mentionRoleInput);
        const row5 = new ActionRowBuilder().addComponents(channelInput);

        modal.addComponents(row1, row2, row3, row4, row5);

        await interaction.showModal(modal);
    }
};

// Handle modal submission
module.exports.modalHandler = async (interaction) => {
    if (interaction.customId === "announcement_modal") {
        const name = interaction.fields.getTextInputValue("announcement_name");
        const message = interaction.fields.getTextInputValue("announcement_message");
        const imageUrl = interaction.fields.getTextInputValue("announcement_image");
        const mentionRole = interaction.fields.getTextInputValue("mention_role");
        const channelId = interaction.fields.getTextInputValue("announcement_channel");

        const announcementChannel = interaction.guild.channels.cache.get(channelId);
        if (!announcementChannel) {
            return interaction.reply({ content: "❌ Invalid channel ID! Please enter a valid one.", ephemeral: true });
        }

        let mentionText = mentionRole ? `<@&${mentionRole}>` : "";

        // Construct the announcement message
        let announcementText = `**${name}**\n\n${message}`;
        if (imageUrl) announcementText += `\n\nImage: ${imageUrl}`;

        await announcementChannel.send({ content: `${mentionText}\n\n${announcementText}` });

        await interaction.reply({ content: "✅ Announcement sent successfully!", ephemeral: true });
    }
};
