import Plugin from 'src/plugin-system/plugin.class';

export default class IngoSCostTransparency extends Plugin {
    init() {
        this.addAnimationEffectClassNames();
    }
    addAnimationEffectClassNames() {
        console.log('addAnimationEffectClassNames');
        const animatableElements = document.querySelectorAll('.ingos-cost-group');
        for (let i=0; i < animatableElements.length; i++) {
            animatableElements[i].addEventListener('click', this.costGroupEnterHandler);
        }
    }
    costGroupEnterHandler(event) {
        if (!event) { return; }
        // TODO rewrite from scratch! refactored legacy code is unreadable, unmaintainable and does not even work!
        const activeGroupElement = event.currentTarget;
        console.log('costGroupEnterHandler activeGroupElement:', activeGroupElement);
        activeGroupElement.classList.add("ingos-active");
        const activeId = activeGroupElement.id;
        console.log(`activeId: ${activeId}`);
        const costGroupContentWrapper = document.getElementById("ingos-cost-group-contents");
        console.log('costGroupContentWrapper #ingos-cost-group-contents', costGroupContentWrapper);
        if (!costGroupContentWrapper) { return; }
        const activeContent = costGroupContentWrapper.querySelector("*[data-for='" +  activeId + "']");
        console.log('activeContent', activeContent);
        if (!activeContent) { return; }
        activeContent.classList.add("ingos-active");
        const activeBar = activeGroupElement.querySelector(".ingos-cost-group-bar");
        console.log('activeBar .ingos-cost-group-bar ', activeBar);
        if (activeBar) {
            console.log('add animate classes to activeBar');
            activeBar.classList.add("animate__animated", "animate__pulse");
        } else { console.log('there is no activeBar')}

        const inactiveGroups = document.getElementsByClassName("ingos-cost-group");
        for (let i = 0; i < inactiveGroups.length; i++) {
            console.log(`process inactiveGroup ${i}`);
            if (inactiveGroups.item(i) !== activeGroupElement) {
                inactiveGroups.item(i).classList.remove("ingos-active");
                const inactiveBar = inactiveGroups.item(i).querySelector(".ingos-cost-group-bar");
                if (inactiveBar) { inactiveBar.classList.remove("animate__animated", "animate__pulse"); }
            }
        }
        // TODO removal does not seem to work!
        var activeGroup = document.getElementsByClassName("ingos-cost-group-content");
        for (let i = 0; i < activeGroup.length; i++) {
            if (activeGroup.item(i) !== activeContent) {
                activeGroup.item(i).classList.remove("ingos-active");
            }
        }
    }
}